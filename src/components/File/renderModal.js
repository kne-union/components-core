import Modal from "@components/Modal";

// 文件预览：内容区自带滚动（file-modal-outer / office / pdf），
// 关掉 Modal 的 body padding 与 SimpleBar，避免双层滚动
const renderModal = ({onCancel, ...props}) => <Modal {...props} noPadding bodyScroll={false}/>;

export default renderModal;
