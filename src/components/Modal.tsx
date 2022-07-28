import React, {ChangeEvent, useState} from 'react';
import {Box, Button, TextField, Modal} from "@mui/material";
import {useFormContext} from "react-hook-form";
import {useMutation, useQueryClient} from "react-query";
import axios from "axios";
import {DataService, ITodo} from "../service/services";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

interface F {
    openw: boolean
    todo: ITodo
    setOpen: (f: boolean) => void
}

const ModalW: React.FC<F> = ({openw, todo, setOpen}) => {

    const queryClient = useQueryClient()
    const x = String(todo._id)

    const {register, formState: {errors}} = useFormContext()

    const handleClose = () => setOpen(false);

    const [text, setValue] = useState<string>('')

    const {mutate} = useMutation(['c', x], (todo: ITodo) => DataService.change(x, todo),{
        onSuccess:()=> queryClient.invalidateQueries('fetch')
    })

    const {mutate: dM} = useMutation((todo: ITodo) => {
        return axios.patch(`todos/${x}`, todo).then(res => console.log(res.data))
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('fetch')
        }
    })

    const change = () => {
        mutate({text})
    }
    const changeTodo = () => {
        dM({done: !todo.done})
    }
    const a = register('textt')

    return (
        <Modal open={openw}
               onClose={handleClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description">
            <Box sx={style}>
                <TextField
                    {...a}
                    value={text}
                    sx={{marginBottom: 3, width: 400}}
                    label={'New Todo'}
                    variant={'outlined'}
                    error={!!errors.text}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                />
                <Button
                    sx={{
                        width: 170, marginLeft: 2, padding: 1.8, borderColor: "green",
                        color: 'green',
                        '&:hover': {
                            "borderColor": "green",
                            "color": 'green',
                        }
                    }}
                    variant={'outlined'}
                    onClick={change}
                >Change
                </Button>
                <Button sx={{
                    width: 170, marginLeft: 2, padding: 1.8, borderColor: "green",
                    color: 'green',
                    '&:hover': {
                        "borderColor": "green",
                        "color": 'green',
                    }
                }}
                        variant={'outlined'}
                        onClick={changeTodo}
                >
                    DONE
                </Button>
            </Box>
        </Modal>
    );
};

export default ModalW;