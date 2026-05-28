import { Product } from "./types";

import jardimDeCristal from "./assets/images/jardim-de-cristal-pulseira.jpeg";
import lacoDeSakura from "./assets/images/laco-de-sakura-pulseira.jpeg";
import coracaoDeLavanda from "./assets/images/coracao-de-lavanda-pulseira.jpeg";
import borboletaEclipse from "./assets/images/borboleta-eclipse-colar.jpeg";
import jardimSecreto from "./assets/images/jardim-secreto-colar.jpeg";
import lavandaNoCampo from "./assets/images/lavanda-no-campo-pulseira.jpeg";
import porDoSolDeOutono from "./assets/images/por-do-sol-de-outono-pulseira.jpeg";
import fadaLilas from "./assets/images/fada-lilas-pulseira.jpeg";
import raiosDeSol from "./assets/images/raios-de-sol-pulseira.jpeg";
import contoDosCoelhos from "./assets/images/o-conto-do-par-de-coelhos-pulseira.jpeg";
import tulipaDeVidro from "./assets/images/tulipa-de-vidro-pulseira.jpeg";
import logo from "./assets/images/logo.png";

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Jardim de Cristal",
    description: "Pulseira delicada inspirada na harmonia de um jardim secreto.",
    price: 65.00,
    image: jardimDeCristal,
    category: "Pulseiras"
  },
  {
    id: "2",
    name: "Laço de Sakura",
    description: "Pulseira romântica com delicados detalhes inspirados nas flores de cerejeira.",
    price: 75.00,
    image: lacoDeSakura,
    category: "Pulseiras"
  },
  {
    id: "4",
    name: "Coração de Lavanda",
    description: "Colar suave e gracioso com delicado pingente de coração e tons lilás.",
    price: 45.00,
    image: coracaoDeLavanda,
    category: "Colares"
  },
  {
    id: "5",
    name: "Borboleta Eclipse",
    description: "Colar sofisticado e moderno que destaca o voo elegante da borboleta.",
    price: 95.00,
    image: borboletaEclipse,
    category: "Colares"
  },
  {
    id: "7",
    name: "Jardim Secreto",
    description: "Colar sofisticado que revela a beleza oculta de flores e cristais.",
    price: 85.00,
    image: jardimSecreto,
    category: "Colares"
  },
  {
    id: "8",
    name: "Lavanda no Campo",
    description: "Tons suaves de lilás e detalhes harmoniosos que transmitem paz e serenidade.",
    price: 50.00,
    image: lavandaNoCampo,
    category: "Pulseiras"
  },
  {
    id: "9",
    name: "Pôr do Sol de Outono",
    description: "Combinação calorosa de cores terrosas e douradas que imitam um entardecer.",
    price: 65.00,
    image: porDoSolDeOutono,
    category: "Colares"
  },
  {
    id: "11",
    name: "Fada Lilás",
    description: "Uma pulseira mágica em tons de lilás que desperta o encanto e a fantasia.",
    price: 65.00,
    image: fadaLilas,
    category: "Pulseiras"
  },
  {
    id: "12",
    name: "Raios de Sol",
    description: "Pulseira vibrante e iluminada, perfeita para dias ensolarados.",
    price: 55.00,
    image: raiosDeSol,
    category: "Pulseiras"
  },
  {
    id: "13",
    name: "O Conto do Par de Coelhos",
    description: "Pulseira encantadora com contas delicadas e pequenos pingentes de coelho.",
    price: 70.00,
    image: contoDosCoelhos,
    category: "Pulseiras"
  },
  {
    id: "14",
    name: "Tulipa de Vidro",
    description: "Pulseira delicada com contas que lembram belas tulipas de vidro.",
    price: 60.00,
    image: tulipaDeVidro,
    category: "Pulseiras",
    imagePosition: "object-bottom"
  }
];

export const BRAND_INFO = {
  name: "Made by Kisa",
  tagline: "Beleza em cada detalhe artesanal.",
  whatsapp: "5511945257842", // Brand contact number
  instagram: "@made.by.kisa",
  email: "contato@madebykisa.com",
  logo: logo,
};
