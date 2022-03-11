import {useEffect, useState} from 'react'

const lessons = [
  {
    id: 1,
    name: 'ReactJS là gì? Tại sao nên học ReactJS?'
  },
  {
    id: 2,
    name: 'SPA/MPA là gì?'
  },
  {
    id: 3,
    name: 'Arrow function'
  },
]

function Content() {

  const [lessonid, setLessonid] = useState(1)

  const handleLessonCmt = ({detail}) => {
    console.log(detail)
  } 

  useEffect(()=>{
    window.addEventListener(`lesson-${lessonid}`, handleLessonCmt)

    return ()=>{
      window.removeEventListener(`lesson-${lessonid}`, handleLessonCmt)
    }
  }, [lessonid])


  return (
    <div className="content">
        <ul>
          {
            lessons.map(lesson => 
              <li
              style={{
                color: lesson.id===lessonid 
                  ? 'red'
                  : '#333'
                }} 
              key={lesson.id}
              onClick={()=>{setLessonid(lesson.id)}}
              >{lesson.name}</li>
            )
          }
        </ul>
    </div>
  )
}

export default Content