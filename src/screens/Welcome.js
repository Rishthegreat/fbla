import {View, Text, TouchableOpacity} from "react-native";

export const Welcome = () => {
    return (
        <View>
            <Text>Welcome to our application</Text>
            <TouchableOpacity>
                <Text>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Sign Up</Text>
            </TouchableOpacity>
        </View>
    )
}