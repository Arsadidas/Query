import React from 'react';
import { Button, Card, CardActions, CardContent, Grid, Typography} from "@mui/material";
import {DataService, ITodo} from "../service/services";
import {useMutation, useQueryClient} from "react-query";
import {useFormContext} from "react-hook-form";
import ModalW from "./Modal";

interface P {
    todo: ITodo
}


const TodoList: React.FC<P> = ({todo}) => {
    const {register, formState: {errors}} = useFormContext()
    const queryClient = useQueryClient()


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);


    const {mutate} = useMutation('del', DataService.delete, {
        onSuccess: () => queryClient.invalidateQueries('fetch')
    })


    const handleDelete = (id: string) => {
        mutate(id)
    }

    const b = register('text', {required: true})

    return (
        <Grid item xs={6} md={4}>
            <Card sx={{minWidth: 275}}>
                <CardContent>
                    <Typography sx={{"&:first-letter": {textTransform: 'uppercase'}}}>
                        {todo.text}
                    </Typography>
                    <Typography>
                        {todo.done ? <span>✔</span> : <span>👌</span>}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        sx={{
                            borderColor: "red",
                            color: 'red',
                            '&:hover': {
                                borderColor: "red",
                                color: 'red',
                            }
                        }}
                        onClick={() => handleDelete(todo._id || '')}
                        variant={"outlined"}>Delete</Button>
                    <Button sx={{
                        borderColor: "green",
                        color: 'green',
                        '&:hover': {
                            borderColor: "green",
                            color: 'green',
                        }
                    }}
                            variant={"outlined"}
                            onClick={handleOpen}
                    >
                        Change
                    </Button>
                    <ModalW openw={open} todo={todo} setOpen={setOpen}/>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default TodoList;