import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Pagination from '../../components/admin/Pagination';
import Spinner from '../../components/admin/Spinner';
import '../../css/admin/AdminProductList.css';
import '../../css/admin/AdminComponents.css';

function AdminOrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null); // 모달용 선택된 주문

  // 한글 변환을 위한 매핑 객체 생성
  const statusMap = {
    PENDING: "결제대기",
    PAID: "결제완료",
    PREPARING: "상품준비중",
    SHIPPING: "배송중",
    DELIVERED: "배송완료",
    CANCELLED: "주문취소",
  };

  // 주문 상태 옵션
  const statusOptions = Object.keys(statusMap);

  useEffect(() => {
    fetchOrders();
  }, [currentPage]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8080/api/admin/orders?page=${currentPage}&size=10`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
      toast.error("주문 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderNo, newStatus) => {
    if (!window.confirm(`주문상태를 '${statusMap[newStatus]}'(으)로 변경하시겠습니까?`)) return;

    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:8080/api/admin/orders/${orderNo}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("상태가 변경되었습니다.");

      // 목록 전체를 다시 불러오지 않고, UI만 업데이트
      setOrders(prev => prev.map(order =>
        order.orderNo === orderNo ? { ...order, status: newStatus } : order
      ));

    } catch (error) {
      toast.error("상태 변경 실패");
    }
  };

  // 모달 열기
  const openModal = (order) => {
    setSelectedOrder(order);
  };

  // 모달 닫기
  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="admin-page-container">
      <h2 className="page-title">주문 관리</h2>

      <div className="admin-content-card">
        <div className="content-header">
          <h3>전체 주문 목록</h3>
          <button className="btn-refresh" onClick={fetchOrders}>🔄 새로고침</button>
        </div>

        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>주문번호</th>
                <th>주문일자</th>
                <th>주문자</th>
                <th>상품명</th>
                <th>결제금액</th>
                <th>상태관리</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" className="loading-cell"><Spinner /></td></tr>
              ) : orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.orderNo}>
                    <td onClick={() => openModal(order)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                      {order.orderNo}
                    </td>
                    <td>{order.orderDate}</td>
                    <td>{order.recipientName}</td>
                    <td>
                      {order.items && order.items.length > 0
                        ? `${order.items[0].productName} ${order.items.length > 1 ? `외 ${order.items.length - 1}건` : ''}`
                        : '-'}
                    </td>
                    <td>{order.totalPrice.toLocaleString()}원</td>
                    <td>
                      <select
                        className="status-select"
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.orderNo, e.target.value)}
                        style={{
                          padding: '6px',
                          borderRadius: '4px',
                          border: '1px solid #ddd',
                          color: order.status === 'CANCELLED' ? 'red' :
                            order.status === 'DELIVERED' ? 'green' : '#333',
                          fontWeight: 'bold'
                        }}
                      >
                        {statusOptions.map(key => (
                          <option key={key} value={key}>
                            {statusMap[key]}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6" className="empty-cell">주문 내역이 없습니다.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* --- 주문 상세 모달 --- */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>주문 상세 정보 (No. {selectedOrder.orderNo})</h3>
              <button className="btn-close" onClick={closeModal}>×</button>
            </div>

            <div className="modal-body">
              <div className="info-group">
                <h4>📦 배송지 정보</h4>
                <p><strong>수령인:</strong> {selectedOrder.recipientName}</p>
                <p><strong>연락처:</strong> {selectedOrder.recipientPhone}</p>
                <p><strong>주소:</strong> [{selectedOrder.orderZipcode}] {selectedOrder.orderAddress1} {selectedOrder.orderAddress2}</p>
                <p><strong>배송메시지:</strong> {selectedOrder.deliveryMessage || '-'}</p>
              </div>

              <div className="info-group">
                <h4>🛒 주문 상품 목록</h4>
                <table className="modal-table">
                  <thead>
                    <tr>
                      <th>상품명</th>
                      <th>옵션</th>
                      <th>수량</th>
                      <th>금액</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.productName}</td>
                        <td>{item.optionName || '기본'}</td>
                        <td>{item.qty}개</td>
                        <td>{item.price.toLocaleString()}원</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={closeModal}>닫기</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default AdminOrderList;