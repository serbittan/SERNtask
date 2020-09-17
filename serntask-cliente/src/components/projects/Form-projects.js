import React, { Fragment, useState, useContext } from 'react'
import { projectContext } from '../context/projects'



const FormProjects = () => {
    const projectsContext = useContext(projectContext)
    const { formproject, errorform, showFormProject, addProject, formError } = projectsContext
    // Form state
    const [project, setProject] = useState({
        name: ''
    })

    const { name } = project

    // Para leer el form state
    const handleOnChange = event => {
        setProject({
            ...project,
            [event.target.name]: event.target.value
        })
    }

    // Cuando usuario envia el proyecto
    const onSubmitProject = event => {
        event.preventDefault()

        // validar campos
        if (!name.trim()) {
            formError()

            return
        }
        // agregar al state
        addProject(project)
        // setear campos
        setProject({
            name: ''
        })
    }

    // Cuando user clicka un nuevo proyecto
    const handleOnClick = () => {
        showFormProject()
    }


    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={handleOnClick}
            >New Project</button>

            {formproject && <form
                onSubmit={onSubmitProject}
                className="formulario-nuevo-proyecto"
            >
                <input
                    type="text"
                    className="input-text"
                    name="name"
                    autoFocus
                    placeholder="Project Name"
                    onChange={handleOnChange}
                    value={name}
                />

                <input
                    type="submit"
                    className="btn btn-block btn-primario"
                    value="Add Project"
                />

            </form>}
            
            {errorform && <p className="mensaje error">Project Name is required!</p>}
        </Fragment>
    )
}

export default FormProjects