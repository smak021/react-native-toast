"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const ToastProvider_1 = require("./ToastProvider");
const useToast = () => {
    const [toastMessage, setToastMessage] = (0, react_1.useContext)(ToastProvider_1.ToastContext);
    return { toastMessage, setToastMessage };
};
exports.default = useToast;
//# sourceMappingURL=useToast.js.map