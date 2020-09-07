import React from 'react'

const FormTasks = () => {
    return ( 
        <div className="formulario">
            <form>
                <div  className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Task Name"
                        name="name"
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-block btn-primario"
                        value="Add Task"
                    />
                </div>
            </form>
        </div>
     )
}
 
export default FormTasks