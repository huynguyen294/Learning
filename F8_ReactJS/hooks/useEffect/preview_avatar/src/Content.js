import {useEffect, useState} from 'react';

function Content() {

    const [avatar, setAvatar] = useState()

    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0]

        file.preview = URL.createObjectURL(file)
        setAvatar(file)
    }

    useEffect(()=>{
        //clean up function luôn được chạy mỗi khi "avatar thay đổi"
        //để thực hiện nhiệm vụ xóa bộ nhớ nào đó không cần thiết
        //ở đây là avatar trước đó
        //nếu không xóa thì tất cả ảnh được tải lên sẽ được tạo ObjectURL
        //và lưu đến khi tắt trang web
        return ()=>{
            if(avatar){
                URL.revokeObjectURL(avatar.preview)
            }
        }
    }, [avatar])
    
    return (
        <div className="content">
            <input 
                style={{
                    padding: 10,
                    margin: 10,
                }}
                type="file"
                onChange={e=>handlePreviewAvatar(e)}
            />
            <br />
            {
                avatar && <img 
                    style={{
                        width: 300,
                        marginLeft: 20 
                    }}
                    src={avatar.preview} 
                    alt="" 
                />
            }
        </div>
    )
}

export default Content