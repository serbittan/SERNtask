import React from 'react'

const ItemProject = ({ project }) => {
    const { id, name } = project

    return ( 
        
            <li className="listado-proyectos">
                <button 
                    type="button"
                    className="btn btn-blank">{name}</button>
            </li>

        // </div>
     )
}
 
export default ItemProject