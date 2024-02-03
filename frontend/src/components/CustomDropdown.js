import {Dropdown} from "react-native-element-dropdown";
import {StyleSheet} from "react-native";

export const CustomDropdown =  ({data, value, onChange, placeholder}) => {
    return (
        <Dropdown data={data} style={styles.dropdown} containerStyle={styles.listContainer} labelField="label" valueField="value" value={value} onChange={onChange} placeholder={placeholder} />
    )
}

const styles = StyleSheet.create({
    dropdown: {
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    listContainer: {
        borderRadius: 3
    }
})