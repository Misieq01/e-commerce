import React from 'react'

import {Link} from 'react-router-dom'

const Background = ({backRoute}:{backRoute: string}) =>{
    return <Link to={backRoute}><div className="background" /></Link>;

}

export default Background