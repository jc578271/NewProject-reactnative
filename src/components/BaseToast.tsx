// @ts-ignore
import React from "react"
import {ErrorToast} from "react-native-toast-message"

export const toastConfig = {
    error: (props) => (
        <ErrorToast
            {...props}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 16,
                fontWeight: '400'
            }}
        />
    )
}