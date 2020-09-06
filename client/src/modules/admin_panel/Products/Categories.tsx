import React from 'react'
import {useSelector} from 'react-redux'
import {IRootState} from '../../../store/types/rootStateType'
import {ICategoryDB} from '../../../store/types/categoryTypes'


const Categories = () => {
    
    const categories = useSelector((state:IRootState)=>state.categories.categories)
    
    return <>
        {categories.map((e:ICategoryDB)=>{
            return (
              <div className="data-panel-element__container" key={e._id}>
                <div>{e.name}</div>
                <div>{e.active ? "active" : "disabled"}</div>
                <div>Edit</div>
                <div>Delete</div>
              </div>
            );
        })}
    </>}

export default Categories