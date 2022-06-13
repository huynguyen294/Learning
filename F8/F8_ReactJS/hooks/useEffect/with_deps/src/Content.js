import { useState, useEffect } from 'react'

function Content() {

    const [title, setTitle] = useState('')
    const [posts, setPosts] = useState([])
    const [type, setType] = useState('posts')
    const tabs = ['posts', 'comments', 'albums']

    console.log('mounted')

    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/${type}`)
            .then(res => res.json())
            .then(posts => setPosts(posts))
    }, [type])

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
        </div>
    )
}

export default Content