type statusStyles = {
    bgColorDark: string;
    textColorDark: string;
    bgColorLight: string;
    textColorLight: string;
    borderColorDark: string
    borderColorLight: string
 };
 
export const statusStyles: { [key: string]: statusStyles } = {
    pending: {
       bgColorDark: "bg-indigo-700",
       textColorDark: "text-indigo-200",
       bgColorLight: "bg-indigo-400",
       textColorLight: "text-indigo-600",
       borderColorDark: "border-indigo-700",
       borderColorLight: "border-indigo-400",
    },
    onHold: {
       bgColorDark: "bg-red-700",
       textColorDark: "text-red-300",
       bgColorLight: "bg-red-400",
       textColorLight: "text-red-800",
       borderColorDark: "v-red-700",
       borderColorLight: "border-red-400",
    },
    inProgress: {
       bgColorDark: "bg-blue-700",
       textColorDark: "text-blue-300",
       bgColorLight: "bg-blue-300",
       textColorLight: "text-blue-700",
       borderColorDark: "border-blue-700",
       borderColorLight: "border-blue-300",
    },
    underReview: {
       bgColorDark: "bg-orange-600",
       textColorDark: "text-orange-300",
       bgColorLight: "bg-orange-400",
       textColorLight: "text-orange-700",
       borderColorDark: "border-orange-600",
       borderColorLight: "border-orange-400",
    },
    completed: {
       bgColorDark: "bg-green-700",
       textColorDark: "text-green-300",
       bgColorLight: "bg-green-300",
       textColorLight: "text-green-700",
       borderColorDark: "border-green-700",
       borderColorLight: "border-green-300",
    },
 };