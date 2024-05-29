// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../guard/auth.service';
import { ApiService } from '../service/api.service';
import { User } from '../model/Usuario';
import { OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MenuItem, MessageService } from 'primeng/api';
import { TerminalService } from 'primeng/terminal';
import { Subscription } from 'rxjs';
import { GameService } from '../guard/game.service';
import { Producto } from '../model/Producto';
import { Partida } from '../model/Partida';
import { Estrella } from '../model/Estrella';
import { Nave } from '../model/Nave';

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
    partidaExistente: boolean = true;

    partida: Partida | null = null;

    naveActual: Nave | null = null;

    displayTerminal: boolean = false;

    displayFinder: boolean = false;

    displayProfile: boolean = false;

    displayInfo: boolean = false;

    displayStar: boolean = false;


    inventoryItems: Producto[] = this.generateRandomProducts(30);

    dockItems: MenuItem[] | undefined;

    responsiveOptions: any[] | undefined;

    images: any[] | undefined;

    nodes: any[] | undefined;

    subscription: Subscription | undefined;

    currentDate = new Date();

    private intervalId: any;

    estrellaSeleccionada: Estrella | undefined = undefined;

    constructor(private ApiService: ApiService, private AuthService: AuthService, private messageService: MessageService, private terminalService: TerminalService, private gameService: GameService) {
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
        this.cargarPartida();
      }
      commandHandler(text: string) {
        let response: Observable<any> | string | undefined;
        const argsIndex = text.indexOf(' ');
        const command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;
        const args = argsIndex !== -1 ? text.substring(argsIndex + 1) : '';

        // Verificar si el usuario está autenticado

        // Obtener el rol del usuario autenticado
        const userRole = this.AuthService.getUserRole();

        // Comandos disponibles según el rol
        const pilotCommands = ['viajar', 'estrellasCercanas', 'radar'];
        const traderCommands = ['comprar', 'vender', 'inventario'];

        // Comprobar si el comando es adecuado para el rol del jugador
        if (pilotCommands.includes(command) && userRole !== 'Piloto' && userRole !== 'Capitán') {
            this.terminalService.sendResponse("No tienes permiso para ejecutar este comando.");
            return;
        }
        if (traderCommands.includes(command) && userRole !== 'Comerciante' && userRole !== 'Capitán') {
            this.terminalService.sendResponse("No tienes permiso para ejecutar este comando.");
            return;
        }


        if (!this.partidaExistente && !['crear', 'unirse', 'log-out', 'help'].includes(command)) {
            this.terminalService.sendResponse("Por favor, únete o crea una tripulación para acceder a esta función.");
            return;
        }

        switch (command) {
            case "help":
                this.displayHelp();
                break;
            case "viajar":
                response = this.gameService.travel(args);
                break;
            case "rol":
                const newRole = args;
                if (!newRole) {
                    response = 'Por favor, proporciona un nuevo rol.';
                } else {
                    response = this.gameService.updateUserRole(newRole).pipe(
                        map(res => `Rol del usuario actualizado a ${newRole}`),
                        catchError(error => {
                            console.error('Error actualizando el rol:', error);
                            return of('Error al actualizar el rol');
                        })
                    );
                }
                break;
            case "crear":
                response = this.gameService.crear(args);
                break;
            case "unirse":
                response = this.gameService.unirse(parseInt(args));
                break;
            case "infoEstrella":
                response = "Abriendo información de la estrella";
                this.displayStar = true;
                break;
            case "estrellasCercanas":
                response = this.gameService.list(this.naveActual?.currentStar?.id ?? 0);
                break;
            case "comprar":
            case "vender":
                response = this.gameService.handleTransaction(args, command);
                break;
            case "inventario":
                response = "Abriendo información del inventario";
                this.displayInfo = true;
                break;
            case "estadisticas":
                response = "Abriendo información de la partida";
                this.displayProfile = true;
                break;
            case "radar":
                response = this.gameService.radar();
                break;
            case "saludos":
                response = `Hola ${args}, en qué puedo ayudarte?`;
                break;
            case "log-out":
                this.AuthService.logout(); // Asegúrate de que este método exista y sea adecuado
                break;
            default:
                response = 'Comando no reconocido, ingresa "help" para más ayuda';
                break;
        }

        if (response instanceof Observable) {
            response.subscribe(
                result => this.terminalService.sendResponse(result as string),
                error => this.terminalService.sendResponse('Error procesando el comando')
            );
        } else if (response) {
            this.terminalService.sendResponse(response);
        }
    }


    displayHelp(): void {
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
    cargarPartida() {
      const partidaData = localStorage.getItem('partida');
      console.log(partidaData);
      if (partidaData) {

      console.log("partidaData");
        this.partida = Partida.fromJSON(JSON.parse(partidaData));
        console.log("INNNNN");
        console.log(this.partida);
        this.partidaExistente = true;
        this.estrellaSeleccionada = this.obtenerEstrellaActual();
      }
    }
    obtenerEstrellaActual(): Estrella | undefined {
      // Asegura que la partida y la nave existan antes de intentar acceder a la estrella
      const naveData = localStorage.getItem('nave');
      console.log(naveData);
      if (naveData) {

      this.naveActual = Nave.fromJSON(JSON.parse(naveData));
      console.log(this.naveActual.currentStar);
      return this.naveActual?.currentStar;
    }
    return undefined;
  }

    obtenerNombreProducto(idProducto: number): Observable<string> {
      return this.ApiService.getProductById(idProducto).pipe(
        map(producto => producto ? producto.nombre : 'Producto desconocido')
      );
    }


}
