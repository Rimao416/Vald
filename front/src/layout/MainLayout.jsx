import React,{useState} from 'react'
import Sidebar from '../components/Sidebar';
import Navigation from '../components/Navigation';

function MainLayout({children}) {
    const [inactive, setInactive] = useState(false);
  
 
  return (
    <> 
    <Sidebar inactive={inactive} />
      <Navigation inactive={inactive} setInactive={setInactive}/>
      <div className={`main-layout  ${inactive ? "main-layout--inactive" : ""}`}>
        {children}
      </div>
    </>
  )
}

export default MainLayout
