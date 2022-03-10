import { useState, useEffect } from 'react'

function Content() {

    const [title, setTitle] = useState('')
    const [posts, setPosts] = useState([])
    const [type, setType] = useState('posts')
    const tabs = ['posts', 'comments', 'albums']
    const [showBtnUp, setShowBtnUp] = useState(false)

    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/${type}`)
            .then(res => res.json())
            .then(posts => setPosts(posts))
    }, [type])

    useEffect(()=>{

        const handleScroll = () => {
            //window.scrollY >= window.innerHeight trả về true hoặc false
            setShowBtnUp(window.scrollY >= window.innerHeight)
        }

        window.addEventListener('scroll', handleScroll)

        return ()=>{
            window.removeEventListener('scroll')
        }
    }, [])

    useEffect(()=>{
        if(showBtnUp){
            const btnUp = document.querySelector('#btn-up')
            btnUp.classList.add('active')
            btnUp.addEventListener('click', ()=>{
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            })
            return ()=>{
                btnUp.removeEventListener('click', ()=>{})
            }
        }
    }, [showBtnUp])

    return (
        <div className="content">
            {
                tabs.map((tab, idx) =>
                    <button
                        key={idx}
                        style={
                            tab === type ?
                                {
                                    color: '#fff',
                                    backgroundColor: '#ccc'
                                }
                                : {}
                        }
                        onClick={() => setType(tab)}
                    >{tab}</button>
                )
            }
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Enter title...'
            />
            <ul>
                {
                    posts.map(post =>
                        <li key={post.id}>{post.body ? post.body : post.title}</li>
                    )
                }
            </ul>
            {
                showBtnUp && (
                <button id="btn-up">
                    <i className="fa fa-solid fa-arrow-up"></i>
                </button>
                )
            }
        </div>
    )
}

export default Content