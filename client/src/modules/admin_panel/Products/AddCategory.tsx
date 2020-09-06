import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {ThunkDispatch} from 'redux-thunk'
import {addCategory} from '../../../store/actions/categoryActions'
import {ICategory,IFetchCategories} from '../../../store/types/categoryTypes'
import {IRootState} from '../../../store/types/rootStateType'
import Background from '../../../components/Background'
import {routes} from '../../../routes'

type AppDispatch = ThunkDispatch<IRootState, any, IFetchCategories>; 


const AddCategory = () =>{

    const history = useHistory()
    const dispatch:AppDispatch = useDispatch()

    const [data, setData] = useState<ICategory>({
      name: '',
      active: true
    })

      const inputHandler = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setData({ ...data, [field]: event.target.value });
      };

      const radioHandler = (event:React.ChangeEvent<HTMLInputElement>) =>{
        const value = event.target.value === 'true' ? true : false
        setData({...data,active:value})
        
      }

      const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        dispatch(addCategory(data)).then(()=>{
          history.push(routes.products)
        })
      };

    return (
      <>
        <Background backRoute={routes.products}/>
        <div className="add-category__container">
          <form onSubmit={submitHandler}>
            <input type="text" placeholder="name of category" onChange={(event) => inputHandler(event, "name")} />
            Yes
            <input
              type="radio"
              name="active"
              id="true"
              value="true"
              onChange={(event) => radioHandler(event)}
            />
            No
            <input
              type="radio"
              name="active"
              id="false"
              value="false"
              onChange={(event) => radioHandler(event)}
            />
            <input type="submit" />
          </form>
        </div>
      </>
    );
}

export default AddCategory