import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Layout() {
    return (
        <Tabs
            screenOptions={{
                headerStyle: { backgroundColor: "#B0BEC5"},   //Cor da barra de cima
                tabBarStyle: {backgroundColor: "#B0BEC5"},   // Cor da barra de baixo
                headerTitleAlign: 'center',
                headerTintColor: '#000',
                tabBarActiveTintColor: "#2d24d4", // Define a cor do menu ativo na tab bar
                tabBarInactiveTintColor: "#000" // Define a cor do menu inativo na tabela
            }}
        >
            <Tabs.Screen name="CriarLista" options={{
                headerTitle: "Criar Lista",
                tabBarLabel: "Criar Lista",
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name = "creation" color={color} size={32}/>
                )
            }} />
             <Tabs.Screen name="ExibirListas" options={{
                headerTitle: "Exibir Lista",
                tabBarLabel: "Exibir Lista",
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name = "view-list" color={color} size={32}/>
                )
            }} />
            <Tabs.Screen name="user" options={{
                headerTitle: "Sair do App",
                tabBarLabel: "Sair do App",
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name = "logout-variant" color={color} size={32}/>
                )
            }} />
        </Tabs>
    );
}
