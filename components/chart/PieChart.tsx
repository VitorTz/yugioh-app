import AppStyle from "@/constants/AppStyle";
import { Colors } from "@/constants/Colors";
import { View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";


export type PieCharData = {
    title: string
    value: number
    color: string
}

const Dot = ({color}: {color: string}) => {
    return (
        <View style={{height: 10, width: 10, borderRadius: 5, backgroundColor: color}}/>
    );
};

const pieData: PieCharData[] = [
    {title: "Labrynth", value: 12, color: Colors.red},
    {title: "Blue-Eyes", value: 2112, color: Colors.orange},
    {title: "Spyral", value: 122, color: Colors.white},
    {title: "Ancient Gear", value: 112, color: Colors.gray1},    
];


const RenderLegend = ({data}: {data: PieCharData[]}) => {
    return (
        <View style={{width: '100%', flexDirection: "row", gap: 20, flexWrap: "wrap"}} >
            {
                data.map((item, index) => {
                    return (
                        <View key={index} style={{flexDirection: "row", gap: 10}} >
                            <Dot color={item.color}/>
                            <Text style={AppStyle.textRegular}>{item.title}</Text>
                        </View>
                    )
                })
            }
        </View>
    )
}


const PieChartComponent = ({title, data}: {title: string, data: PieCharData[]}) => {    

    return (
    

        <View
        style={{padding: 20, borderRadius: 4, backgroundColor: Colors.background}}>
        <Text style={AppStyle.textHeader}>{title}</Text>

        <View style={{padding: 20, alignItems: 'center'}}>
            <PieChart
            data={pieData}
            donut
            showGradient
            sectionAutoFocus
            radius={90}
            innerRadius={60}
            innerCircleColor={Colors.gray}
            />
        </View>

        <RenderLegend data={data}/>

        </View>

);

}


export default PieChartComponent