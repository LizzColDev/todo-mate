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


function App() {
  const {
    error,
    loading, 
    searchedTodos, 
    toogleTodo, 
    deleteTodo,
    openModal,
    setOpenModal,
    totalTodos, 
    completedTodos,
    searchValue, 
    setSearchValue,
    addTodo,
  } = useTodos();

  return (
<React.Fragment>
        <TodoHeader>
          <TodoCounter
            totalTodos={totalTodos}
            completedTodos={completedTodos}
            loading={loading}
          />
          <TodoSearch
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            loading={loading}
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
          
      </React.Fragment>
  );
}

export default App;

