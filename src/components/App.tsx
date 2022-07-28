import React, {useState} from 'react';
import {Button, Card, CardActions, CardContent, Container, Grid, Typography} from "@mui/material";
import {useQuery} from "react-query";
import {DataService, ITodo} from "../service/services";
import {LoadingButton} from '@mui/lab'
import TodoList from "./TodoList";
import Input from "./Input";
import {FormProvider, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";

const App = () => {

    const [todos, setTodos] = useState<ITodo[]>([])

    const schema = yup.object({
        text: yup.string().min(4, "Min 4 symbol").required('Write smth')
    })

    const methods = useForm({
        mode: "onChange",
        resolver: yupResolver(schema)
    })

    const {isLoading, data} = useQuery('fetch', DataService.getAll, {
        onSuccess: ({data}) => {
            setTodos(data)
        }
    })

    if (isLoading) {
        return <LoadingButton variant={'outlined'} loadingPosition={'center'} loading={true}>
            Loading Data
        </LoadingButton>
    }

    return (
        <>
            <FormProvider {...methods}>
                <Container sx={{marginTop: 5}} maxWidth={"lg"}>
                    <Input/>
                    <Grid container spacing={2}>
                        {todos.map((todo) => (
                            <React.Fragment key={todo._id}>
                                <TodoList todo={todo}/>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Container>
            </FormProvider>
        </>
    )
}

export default App;
