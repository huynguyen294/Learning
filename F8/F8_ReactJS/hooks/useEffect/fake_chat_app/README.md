- ứng dụng chat trên thời gian thực (sử dụng useEffect, thực tế người ta sẽ sử dụng web socket server)
- cơ chế dựa trên subscribe và unsubscribe
  Bài toán:
- trong file index.js tạo ra 3 kênh tự động mỗi 2 giây phát ra các sự kiện lesson-1, lesson-2, lesson-3
- trong các sự kiện này trả ra cmt của 3 lesson
- thêm sự kiện (lesson-1, lesson-2, lesson-3) tương ứng khi click vào các kênh tương ứng.
- console.log(ev.detail: nội dung cmt mà sự kiện trả ra)
