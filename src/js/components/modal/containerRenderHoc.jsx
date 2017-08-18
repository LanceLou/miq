import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

/**
 * containerRenderHoc高阶组件：
 * 注入诸如： removeContainer
 *          getContainer
 *          renderComponent 等函数
 *
 * 主要用来在指定的container，或者body的最后一个div元素(新建)插入对应元素，同时通过react来管理
 *
 */

const ContainerRenderHoc = WrappedComponent => class extends React.Component {
  static propTypes = {
    visible: PropTypes.bool, // 是否可见
  }
  // 生命周期自动化管理(自动render与remove)
  componentDidMount() {
    if (this.props.visible) {
      this.renderComponent();
    }
  }
  shouldComponentUpdate(props) {
    // console.log(this.props);
    // 如果当前组件不可见，拒绝更新
    // 不过两方都是不可见，即当前弹框本来就不可见，然后props中也没让其可见

    return !(!props.visible && !this.props.visible);
  }
  componentDidUpdate() {
    if (this.props.visible) {
      this.renderComponent();
    }
  }
  componentWillUnmount() {
    console.log('ContainerRenderHoc get unmount');
    this.removeContainer();
  }
  getContainer = () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    return container;
  }
  // 卸载子元素，同时对应dom节点进行remove
  removeContainer = () => {
    if (this.container) {
      const container = this.container;
      ReactDOM.unmountComponentAtNode(container);
      container.parentNode.removeChild(container);
      this.container = null;
    }
  }
  renderComponent = (component, container) => {
    this.container = container || this.getContainer();
    const curprops = {
      renderComponent: this.renderComponent,
      removeContainer: this.removeContainer,
    };
    ReactDOM.render(
      <WrappedComponent {...curprops} {...this.props} />,
      this.container,
    );
  }
  render() {
    return null;
  }
};

export default ContainerRenderHoc;
