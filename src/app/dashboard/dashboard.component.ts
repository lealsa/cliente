// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../guard/auth.service';
import { User } from '../model/Usuario';
import { OnDestroy } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { TerminalService } from 'primeng/terminal';
import { Subscription } from 'rxjs';
import { GameService } from '../guard/game.service';
import { Producto } from '../model/Producto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MessageService, TerminalService,GameService]
})
export class DashboardComponent implements OnInit {


// Sprites
  sprites = [
  "https://www.svgrepo.com/show/303723/crystal-shard.svg",
  "https://www.svgrepo.com/show/303725/item-bag.svg",
  "https://www.svgrepo.com/show/303724/food.svg",
  "https://www.svgrepo.com/show/303719/dragon-egg.svg",
  "https://www.svgrepo.com/show/303718/armor.svg",
  "https://www.svgrepo.com/show/303737/spell-book.svg",
  "https://www.svgrepo.com/show/303727/helmet.svg",
  "https://www.svgrepo.com/show/303739/sword.svg",
  "https://www.svgrepo.com/show/303742/destructive-magic.svg"
];

// Generate random products
  generateRandomProducts = (numProducts: number): Producto[] => {
  const products: Producto[] = [];

  for (let i = 0; i < numProducts; i++) {
    const randomIndex = Math.floor(Math.random() * this.sprites.length);
    const randomVolume = Math.floor(Math.random() * 1000) + 1;
    const nombre = ['Cristal', 'Bolsa', 'Comida', 'Huevo de Dragón', 'Armadura', 'Libro de Hechizos', 'Casco', 'Espada', 'Magia Destructiva'][randomIndex];

    products.push(new Producto(
      i + 1,
      `${nombre} ${i + 1}`,
      this.sprites[randomIndex],
      randomVolume
    ));
  }

  return products;
};
    displayTerminal: boolean = false;

    displayFinder: boolean = false;

    displayProfile: boolean = false;

    displayInfo: boolean = true;

    displayStar: boolean = false;


    inventoryItems: Producto[] = this.generateRandomProducts(30);

    dockItems: MenuItem[] | undefined;

    responsiveOptions: any[] | undefined;

    images: any[] | undefined;

    nodes: any[] | undefined;

    subscription: Subscription | undefined;

    currentDate = new Date();

    private intervalId: any;

    constructor(private AuthService: AuthService, private messageService: MessageService, private terminalService: TerminalService, private gameService: GameService) {
      this.nodes = [
          {
              label: 'Comandos Disponibles',
              children: [
                  { label: 'help - Muestra esta ayuda.' },
                  { label: 'crear [nombre] - Crea tu propia tripulacion!.' },
                  { label: 'unirse [nombre] - Unete a tus amigos y explora el espacio.' },
                  { label: 'estrellas - muestra las estrellas cercanas.' },
                  { label: 'info [estrella] - Infomacion de una estrella.' },
                  { label: 'viajar [destino] - Viaja a un destino especificado.' },
                  { label: 'inventario - Te deja ver el inventario de tu nave.' },
                  { label: 'estadisticas - Te muestra el estado actual de la partida e información importante.' },
                  { label: 'comprar [producto cantidad] - Compra una cantidad especificada de un producto.' },
                  { label: 'vender [producto cantidad] - Vende una cantidad especificada de un producto.' },
                  { label: 'login [usuario contraseña] - Autentica al usuario para acceder al juego.' },
                  { label: 'saludos [nombre] - Saluda al jugador.' },
                  { label: 'radar - Informa de naves cercanas en la misma ubicación.' }
              ]
          },
          {
                      label: 'Comercio Interplanetario',
                      children: [
                          { label: 'Consulta la lista de productos disponibles al llegar a cada planeta.' },
                          { label: 'Usa créditos para transacciones. Estrategia: compra bajo y vende alto.' },
                          { label: 'Precios basados en oferta y demanda local: PV = FD / (1 + S), PC = FO / (1 + S).' }
                      ]
                  },
                  {
                      label: 'Viaje y Navegación',
                      children: [
                          { label: 'Viaja a través de agujeros de gusano entre estrellas para ahorrar tiempo.' },
                          { label: 'Planifica rutas eficientes considerando conexiones entre agujeros de gusano.' },
                          { label: 'Capacidades de naves afectan la velocidad y carga útil durante los viajes.' }
                      ]
                  },
                  {
                      label: 'Sistema de Tiempo y Cuotas',
                      children: [
                          { label: 'El juego progresa por días. Cada acción, como viajar o comerciar, consume tiempo.' },
                          { label: 'Debes cumplir con cuotas de ingresos dentro de un tiempo específico para no perder.' },
                          { label: 'Administra tu tiempo y recursos cuidadosamente para maximizar tus ganancias antes de que el plazo expire.' }
                      ]
                  },
                  {
                      label: 'Naves y Roles',
                      children: [
                          { label: 'Cada nave tiene una capacidad limitada de carga y una velocidad máxima específica.' },
                          { label: 'Roles de Jugadores: Piloto (maneja la nave), Comerciante (realiza transacciones), y Capitán (hace ambas tareas).' },
                          { label: 'Elige tu nave y rol según tu estrategia de juego y las necesidades de tu equipo.' }
                      ]
                  },
                  {
                      label: 'Consejos y Estrategias',
                      children: [
                          { label: 'Familiarízate con las características económicas de cada planeta.' },
                          { label: 'Revisa regularmente tu inventario y estadísticas para tomar decisiones informadas.' }
                      ]
                  }
      ];
  }
    ngOnInit() {
        this.dockItems = [
            {
                label: 'Terminal',
                tooltipOptions: {
                    tooltipLabel: 'Terminal',
                    tooltipPosition: 'top',
                    positionTop: -15,
                    positionLeft: 15,
                    showDelay: 1000
                },
                icon: 'https://www.svgrepo.com/show/388730/terminal.svg',
                command: () => {
                    this.displayTerminal = true;
                }
            },
            {
            label: 'Tu nave',
            tooltipOptions: {
                tooltipLabel: 'Tu nave',
                tooltipPosition: 'top',
                positionTop: -15,
                positionLeft: 15,
                showDelay: 1000
            },
            icon: "https://www.svgrepo.com/show/388459/rocket-one.svg",
            command: () => {
                this.displayInfo = true;
            }
        },{
          label: 'Ubicacion',
          tooltipOptions: {
              tooltipLabel: 'Ubicacion',
              tooltipPosition: 'top',
              positionTop: -15,
              positionLeft: 15,
              showDelay: 1000
          },
          icon: "https://www.svgrepo.com/show/337759/gps.svg",
          command: () => {
              this.displayStar = true;
          }
      },
        {
          label: 'Perfil',
          tooltipOptions: {
              tooltipLabel: 'Perfil',
              tooltipPosition: 'top',
              positionTop: -15,
              positionLeft: 15,
              showDelay: 1000
          },
          icon: "https://www.svgrepo.com/show/299054/profile-user.svg",
          command: () => {
              this.displayProfile = true;
          }
      },{
        label: 'Help',
        tooltipOptions: {
            tooltipLabel: 'Help',
            tooltipPosition: 'top',
            positionTop: -15,
            positionLeft: 15,
            showDelay: 1000
        },
        icon: "https://www.svgrepo.com/show/387779/help.svg",
        command: () => {
            this.displayFinder = true;
        }
    },
        ];
        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1
            }
        ];
        this.subscription = this.terminalService.commandHandler.subscribe((command) => this.commandHandler(command));
        this.intervalId = setInterval(() => {
          this.currentDate = new Date(); // Update the current date every second
        }, 1000);

      }
      commandHandler(text: any) {
        let response;
        let argsIndex = text.indexOf(' ');
        let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;
        let args = argsIndex !== -1 ? text.substring(argsIndex + 1) : '';

        switch (command) {
            case "help":
                this.displayHelp();
                break;
            case "viajar":
                response = this.gameService.travel(args);
                break;
            case "crear":
                response = this.gameService.crear(args);
                break;
            case "unirse":
                response = this.gameService.unirse(args);
                break;
            case "info":
                response ="Abriendo informacion de la nave"
                this.displayInfo=true
                break;
            case "estrellas":
                response = this.gameService.list();
                break;
            case "comprar":
                response = this.gameService.handleTransaction(args, 'buy');
                break;

            case "vender":
                response = this.gameService.handleTransaction(args, 'sell');
                break;

            case 'log-out':
                response = this.AuthService.logout();
                break;

            case 'greet':
                response = 'Hola ' + args + '!';
                break;
            case "inventario":
                response = this.gameService.inv();
                break;
            case "estadisticas":
                response = this.gameService.stats();
                break;
            case "radar":
                response = this.gameService.radar();
                break;
            case 'saludos':
                response = "Hola soy la terminal, en que puedo ayudarte";
                break;

            default:
                response = 'Comando no reconocido, ingresa Help para mas ayuda';
                break;
        }

        if (response) {
            this.terminalService.sendResponse(response as string);
        }
    } displayHelp(): void {
      this.displayFinder =true;
  }
    ngOnDestroy() {
      if (this.intervalId) {
        clearInterval(this.intervalId); // Clear the interval on component destruction
      }
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
