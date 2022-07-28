import React, {useState} from 'react';
import {Container, Grid} from "@mui/material";
import {useQuery} from "react-query";
import {DataService, ITodo} from "../service/services";
import {LoadingButton} from '@mui/lab'
import TodoList from "./TodoList";
import Input from "./Input";
import {FormProvider, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import Pagination from "./Pagination";

const App = () => {

    const [todos, setTodos] = useState<ITodo[]>([])

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [countryPerPage] = useState<number>(10)

    const lastTodoI = currentPage * countryPerPage
    const firstTodoI = lastTodoI - countryPerPage
    const currentPageI = todos.slice(firstTodoI,lastTodoI)

    const paginate = (pageNumber:number) => setCurrentPage(pageNumber)

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
                        {currentPageI.map((todo) => (
                            <React.Fragment key={todo._id}>
                                <TodoList todo={todo}/>
                            </React.Fragment>
                        ))}
                    </Grid>
                <Pagination paginate={paginate} totalTodos={todos.length} countryPerPage={countryPerPage}/>
                </Container>
            </FormProvider>
        </>
    )
}

export default App;
