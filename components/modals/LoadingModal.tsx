import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";

export default function LoadingModal({ visible }: { visible: boolean }) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
        >
            <View
                style={[{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }, StyleSheet.absoluteFillObject]}>
                <View style={{
                    width: "20%",
                    height: "10%",
                    backgroundColor: 'white',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <ActivityIndicator size="large" />
                </View>
            </View>
        </Modal>
    )
}