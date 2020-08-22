import React from 'react'
import {useSelector} from 'react-redux'
import {IRootState} from '../../../store/types/rootStateType'
import {ICategoryDB} from '../../../store/types/categoryTypes'


const Categories = () => {
    
    const categories = useSelector((state:IRootState)=>state.categories.categories)
    
    return <>
        {categories.map((e:ICategoryDB)=>{
            return (
              <div className="admin-product-panel__container" key={e._id}>
                {e.name}
                {e.active}
              </div>
            );
        })}
    </>}

export default Categories