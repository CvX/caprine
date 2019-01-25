import {TouchBar, ipcMain as ipc, nativeImage} from 'electron';
import {sendAction, getWindow} from './util';

const {TouchBarButton} = TouchBar;

// TODO: [TS] Add Conversation type
ipc.on('conversations', (_event: Electron.Event, conversations: any[]) => {
	const items = conversations.map(({label, selected, icon}, index: number) => {
		return new TouchBarButton({
			label: label.length > 25 ? label.slice(0, 25) + '…' : label,
			backgroundColor: selected ? '#0084ff' : undefined,
			icon: nativeImage.createFromDataURL(icon),
			iconPosition: 'left',
			click: () => {
				sendAction('jump-to-conversation', index + 1);
			}
		});
	});

	const touchBar = new TouchBar({items});
	const win = getWindow();

	win.setTouchBar(touchBar);
});
