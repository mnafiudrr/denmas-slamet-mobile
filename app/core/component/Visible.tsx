type VisibleProps = {
  visible: boolean;
  children: JSX.Element;
  onInvisible?: () => JSX.Element;
};

const Visible = ({visible, children, onInvisible}: VisibleProps) => {
  if (visible) {
    return children;
  }
  if (onInvisible) return onInvisible();
  return null;
};

Visible.defaultProps = {
  onInvisible: undefined,
};

export default Visible;
