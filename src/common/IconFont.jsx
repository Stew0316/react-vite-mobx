import { createFromIconfontCN  } from '@ant-design/icons';

export const ICON_CODE=createFromIconfontCN({
    scriptUrl: [
        // process.env.REACT_APP_ICON_URL
        import.meta.env.VITE_ICON_URL
    ],
});