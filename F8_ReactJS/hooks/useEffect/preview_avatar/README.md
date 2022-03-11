- đây là ví dụ về việc sử dụng useEffect để clean up
  Ứng dụng
- tránh tình trạng memory leak: khi sử dụng setState để thay đổi dữ liệu nhưng không xóa dữ liệu trước đó dẫn đến các dữ liệu đó không sử dụng cho đến khi tắt trang web mới được xóa
- vì vậy khi state thay đổi cần clean up state trước
- clean up function từ lần thứ 2 sẽ luôn được chạy trước khi chạy callback của useEffect
- để đảm bảo rằng dữ liệu trước khi chạy callback là sạch sẽ.
