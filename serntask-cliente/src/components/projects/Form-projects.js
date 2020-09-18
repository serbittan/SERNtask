import React, { Fragment, useState, useContext, useEffect } from 'react'
import { projectContext } from '../context/projects'



const FormProjects = () => {
    const projectsContext = useContext(projectContext)
    const { projectselected, formproject, errorform, showFormProject, addProject, formError, handleUpdateProject, cleanProject } = projectsContext

    useEffect(() => {
        if (projectselected ) {
            setProject (projectselected)
         
        } 
        
    }, [projectselected])


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
        if (projectselected !== null) {
            handleUpdateProject(project)
            
        } else {
            // agregar al state
            addProject(project)
        }
        // // setear campos (acción que pasamos al clickar nuevo proyecto)
        // setProject({
        //     name: ''
        // })
    }

    // Cuando user clicka un nuevo proyecto
    const handleOnClick = () => {
        // evitamos tener projectselected activo. 
        cleanProject()
        // evitamos que haya algun input previo
        setProject({
            name: ''
        })
        // abrimos el form
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
                    value={ projectselected ? "Save Project" : "Add Project"}
                />

            </form>}
            
            {errorform && <p className="mensaje error">Project Name is required!</p>}
        </Fragment>
    )
}

export default FormProjects