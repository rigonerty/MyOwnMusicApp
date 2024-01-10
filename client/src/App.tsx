import React,{useEffect} from 'react'
import { AppRouter } from './router/AppRouter'
import { Navbar } from './modules/Navbar'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Search } from './modules/Search'
import { appUseSelector,appUseDispatch } from './hooks/reduxHooks'
import { isNotAuthRouter } from './router/router'
import { useRefreshQuery } from './store/api/authApi'
import { setUser } from './store/slices/user/user'
import { useLazyGetMusicByIdQuery } from './store/api/musicApi'
import { addMusic } from './store/slices/music/music'
import { PlaySong } from './modules/PlaySong'
import { useLazyGetAlbumByIdQuery } from './store/api/albumApi'
import { addAlbum } from './store/slices/albums/albums'
import { useLazyGetAuthorByIdQuery } from './store/api/authorApi'
import { addAuthor } from './store/slices/authors/authors'

export const App = () => {
  let isAuth = appUseSelector(state=>state.user.isAuth)
  const dispatch = appUseDispatch()
  const {data, isFetching,isSuccess} = useRefreshQuery()
  const [getMusicRequest] = useLazyGetMusicByIdQuery()
  const [getAlbumRequest] = useLazyGetAlbumByIdQuery()
  const [getAuthorRequest] = useLazyGetAuthorByIdQuery()
  const albums:number[] = []
  const authors:number[] = []
  const addMusicToRedux = (id:number)=>{
    getMusicRequest(id)
      .unwrap()
      .then(data=>{
        dispatch(addMusic({...data}))
        addAlbumToRedux(data.album)
        addAuthorToRedux(data.author)
      })
      .catch(reject=> {console.log(reject)})
  }
  const addAlbumToRedux = (id:number)=>{
    if(!albums.find(a=>a === id)){
        albums.push(id)
      getAlbumRequest(id)
        .unwrap()
        .then(data=>{
          dispatch(addAlbum({...data, id}))
        })
        .catch(reject=> console.log(reject))
    }
  }
  
  const addAuthorToRedux = (id:number)=>{
    if(!authors.find(a=>a===id)){
      authors.push(id)
      getAuthorRequest(id).unwrap()
      .then(data=>{
        dispatch(addAuthor({...data}))
      })
      .catch(rej=>console.log(rej))
    }
  }
  if(data && isSuccess) {
    isAuth = true
    localStorage.setItem("token", data.accessToken)
    dispatch(setUser(data.user))
  }
  useEffect(()=>{
    if(data){
      data.user.music.map(a=>{
        setTimeout(()=>addMusicToRedux(a),1)})
    }
  },[data])

  return (
    <div className='App'>
      <BrowserRouter>
      {!isFetching &&
      <>
          {isAuth
          ?
          <>
            <div className='content'>
              <Search/>
              <AppRouter/>
            </div>
            <PlaySong/>
            <Navbar/> 
          </>
          :
            <Routes>
                <Route path='/register' element={isNotAuthRouter[0].component}/> 
                <Route path='*' element={<Navigate to="/register" replace/>}/> 
            </Routes>
          }       
      </>
      }
      </BrowserRouter>
    </div>
  )
}
