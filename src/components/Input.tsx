import React, {ChangeEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";
import * as  yup from 'yup'
import {FormProvider, useForm, useFormContext} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation, useQueryClient} from "react-query";
import {DataService, ITodo} from "../service/services";

const Input = () => {

    const [text, setValue] = useState<string>('')
    const queryClient = useQueryClient()

    const {register, handleSubmit, reset, formState: {errors}} = useFormContext();

    const onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void> = handleSubmit((data) => {
        reset()
    })

    const {mutate} = useMutation('create', (todo: ITodo) => DataService.create(todo), {
        onSuccess: () => queryClient.invalidateQueries('fetch')
    })

    const handleAdd = () => {
        mutate({text, done: false})
        setValue('')
    }

    const a = register('text', {required: true})

    return (
        <form onSubmit={onSubmit}>
            <TextField
                {...register('text', {required: true})}
                value={text}
                sx={{marginBottom: 3, width: 400}}
                label={'Write Todo'}
                variant={'outlined'}
                error={!!errors[text]}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            />
            {errors.text && JSON.stringify(errors.text.message)}
            <Button
                disabled={!text}
                onClick={handleAdd}
                sx={{width: 200, marginLeft: 2, padding: 1.8}}
                variant={'outlined'}>Create</Button>
        </form>
    );
};

export default Input;