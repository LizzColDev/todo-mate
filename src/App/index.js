import React from "react";
import { useTodos } from "./useTodos";
import { TodoCounter } from "../TodoCounter";
import { TodoSearch } from "../TodoSearch";
import { TodoList } from "../TodoList";
import { CreateTodoButton } from "../CreateTodoButton";
import { TodoItem } from "../TodoItem";
import { Modal } from "../Modal";
import { TodoForm } from "../TodoForm";
import { TodosError } from "../TodosError";
import { TodosLoading } from "../TodosLoading";
import { EmptyTodos } from "../EmptyTodos";
import { TodoHeader } from "../TodoHeader";
import { ChangeAlert } from "../ChangeAlert";


function App() {
  const {
    states,
    stateUpdaters,
  } = useTodos();
  const {
    loading,
    totalTodos,
    completedTodos,
    searchValue,
    searchedTodos,
    openModal,
    error,
  } = states;
  const {
    setSearchValue,
    addTodo,
    toogleTodo,
    deleteTodo,
    setOpenModal,
    synchronizeTodos
  } = stateUpdaters;
  return (
<React.Fragment>
        <TodoHeader loading={loading}>
          <TodoCounter
            totalTodos={totalTodos}
            completedTodos={completedTodos}
          />
          <TodoSearch
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </TodoHeader>

        <TodoList 
          error={error}
          loading={loading} 
          searchedTodos={searchedTodos} 
          searchValue={searchValue}
          totalTodos={totalTodos}
          onError={()=> <TodosError/>}
          onLoading={()=><TodosLoading/>}
          onEmptyTodos={()=><EmptyTodos/>}
          
          onEmptySearchResults={(searchText)=><p>No hay resultados para {searchText} </p>}
          render={todo=>(
            <TodoItem 
            key={todo.text} 
            text={todo.text} 
            completed={todo.completed}
            onComplete={()=> toogleTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
            />
          )}
        />
          
        {!!openModal && (
                <Modal>
                  <TodoForm
                  addTodo={addTodo}
                  setOpenModal = {setOpenModal}
                  ></TodoForm>
                </Modal>
        )}

        <CreateTodoButton
          setOpenModal = {setOpenModal}
        />
          <ChangeAlert
            synchronize  = {synchronizeTodos}
          />
      </React.Fragment>
  );
}

export default App;

