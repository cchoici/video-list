import { connect } from 'react-redux';
import { remote, ipcRenderer } from 'electron';
import { setMain, savePlayerData } from '../modules/main';
import MainView from '../components/MainView';

const closeWindow = () => {
  const win = remote.getCurrentWindow();
  win.close();
};
const minimizeWindow = () => {
  const win = remote.getCurrentWindow();
  win.minimize();
};
const playWindow = (mode) => {
  const win = remote.getCurrentWindow();
  ipcRenderer.send(mode, win.getPosition());
};

const mapStateToProps = ({
  main: {
    winMode,
  }
}) => ({
  winMode,
});

const mapDispatchToProps = dispatch => ({
  onCloseWindow: () => (

    dispatch(savePlayerData())
      .then(() => closeWindow())
  ),
  onMinimizeWindow: () => {
    minimizeWindow();
  },
  onPlayWindow: (mode) => {
    const winMode = mode === 'PLAYER' ? 'NORMAL' : 'PLAYER';
    dispatch(setMain({ winMode }));
    playWindow(`${winMode.toLowerCase()}-mode`);
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView);
