import React, { useState, useEffect } from 'react';
import Logo from './assets/logo.svg';
import './App.css';
import Todo from './Todo.component.jsx';
import db from './firebase.utils';
import firebase from 'firebase';
import TodoModel from './models/todo-model';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Modal, TextField } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {

  const classes = useStyles();
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [openId, setOpenId] = useState(null);
  const [open, setOpen] = useState(false);

  const getTaskById = (id) => {
   
    const todo = todos.find(obj => {
      if (obj && obj.getId() === id) {
        return true;
      } else {
        return false;
      }
    });
    if (todo === undefined) {
      return '';
    } else {
      return todo.getTask();
    }
  }

  const handleOpen = (id) => {
    setOpen(true);
    setOpenId(id);
  }
  const handleClose = () => {
    setOpen(false);
    setOpenId(null);
  }

  const updateInput = (event) => {
    if (event.target.value !== input) {
      setInput(event.target.value);
    }
  }

  const deleteTodo = (id) => {
    db.collection('todos').doc(id).delete()
  }

  const updateTodo = (id) => {
    //Update todo with the new input text
    db.collection('todos').doc(id).set({
      task: input
    }, { merge: true });

    setOpen(false);
  }

  // when the app loads, we need to listen to the db and fetch new todos as they get added/removed

  useEffect(() => {
    // this code here... fires when the app.js loads
    getAll()
  }, []);

  const getAll = () => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {

      let modelArr = snapshot.docs.map(item => {
        const data = item.data();
        return new TodoModel(data.task, data.timestamp, item.id);
      })
      setTodos(modelArr);
    })
  } 

  const addTodo = (e) => {
    //this will fire off when we click the button
    e.preventDefault(); //I put the button in the form so I can press ENTER to submit. Need preventDefault to stop page from refreshing 

    db.collection('todos').add({
      task: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }); // this was hard

    // const newTodo = new 
    // setTodos([...todos, input]);
    getAll();
    setInput(''); // clear-up the input field

  }
  const modalObj = <Modal open={open} onClose={e => handleClose()}>

    <div className={classes.paper}>
      <h1> Edit To-Do </h1>
      <form noValidate autoComplete='off'>
        <div>
          <TextField id="filled-name" label="Name"
            defaultValue={getTaskById(openId)}
            onChange={updateInput} />
        </div>

      </form>
      <Button onClick={e => updateTodo(openId)}> Update Todo </Button>
    </div>

  </Modal>;

  return (
    <div className="App">

      {open ? modalObj : ''}

      <img alt='ApplyBoardLogo' src={Logo} />

      <h1> Apply To-Do ✅ </h1>
      <TextField id="filled-basic" label="What's next ❓" variant="filled" value={input} onChange={updateInput} />
      <Button className='Add-button' color="secondary" onClick={addTodo}> Add Todo </Button> 
      {/* <form>
       <FormControl>
          <InputLabel> ✅ What's Next? </InputLabel>
          <Input value={input} onChange={e => setInput(e.target.value)} />
       </FormControl> 

        <Button disabled={!input} variant='contained' color='primary' type='submit' onClick={addTodo}> Add Todo </Button>
      </form> */}

      <ul>
        {todos.map(todo => (
          <Todo handleOpen={handleOpen}
            data={todo} updateTodo={updateTodo}
            handleClose={handleClose}
            updateInput={updateInput}
            modalOpen={open}
            deleteTodo={deleteTodo}
            addTodo={addTodo} />
        ))}
         

      </ul>

    </div>
  );
}

export default App;
