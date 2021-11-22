import { SwipeableDrawer } from '@material-ui/core';

type CustomDrawerProps = {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export const CustomDrawer: React.FC<CustomDrawerProps> = ({
  children,
  ...props
}) => {
  return (
    <SwipeableDrawer anchor={'right'} {...props}>
      {children}
    </SwipeableDrawer>
  );
};
