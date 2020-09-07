import React from 'react'

const ItemTask = ({ task }) => {
    const { id, name, status, projectId } = task
    return ( 
        <li className="tarea sombra">
            <p>{name}</p>

            <div className="estado">
                {status ?
                (
                    <button
                        type="button"
                        className="completo"
                    >Completed</button>
                )
                :
                (
                    <button
                        type="button"
                        className="incompleto"
                    >Incompleted</button>
                )
            }</div>
            
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                >Edit</button>

                <button
                    type="button"
                    className="btn btn-secundario"
                >Delete</button>
            </div>

        </li>
     )
}
 
export default ItemTask