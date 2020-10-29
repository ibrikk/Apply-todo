import React from 'react';
import './todo.styles.css';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { List, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';






function Todo(props) {




    return (
        <div>

            <List className='todo_list'>
                <ListItem>
                    <ListItemAvatar>
                    </ListItemAvatar>
                    <ListItemText primary={ props.data ? props.data.getTask() : ''} secondary='Dummy Deadline ⏰' />
                </ListItem>
                <button onClick={e => props.handleOpen(props.data.getId())}> Edit </button>
                <DeleteForeverIcon onClick={e => props.deleteTodo(props.data.getId())} />
                { /* <li>{props.text}</li> */}
            </List>
        </div>
    )
}

export default Todo;