function car_back () {
    mecanumRobotV2.Motor(LR.Upper_left, MD.Back, 20)
    mecanumRobotV2.Motor(LR.Lower_left, MD.Back, 20)
    mecanumRobotV2.Motor(LR.Upper_right, MD.Back, 20)
    mecanumRobotV2.Motor(LR.Lower_right, MD.Back, 20)
}
function car_left () {
    // Giro lateral izquierdo (strafe)
    mecanumRobotV2.Motor(LR.Upper_left, MD.Back, 20)
    mecanumRobotV2.Motor(LR.Lower_left, MD.Back, 20)
    mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, 20)
    mecanumRobotV2.Motor(LR.Lower_right, MD.Forward, 20)
}
// Funciones de movimiento (con velocidades ajustables)
function car_forward () {
    mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, 20)
    mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, 20)
    mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, 20)
    mecanumRobotV2.Motor(LR.Lower_right, MD.Forward, 20)
}
function car_right () {
    // Giro lateral derecho (strafe)
    mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, 20)
    mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, 20)
    mecanumRobotV2.Motor(LR.Upper_right, MD.Back, 20)
    mecanumRobotV2.Motor(LR.Lower_right, MD.Back, 20)
}
function car_stop () {
    mecanumRobotV2.Motor
mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, 0)
    mecanumRobotV2.Motor;
mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, 0)
    mecanumRobotV2.Motor
mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, 0)
    mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, 0)
    mecanumRobotV2.Motor
}
let rightVal = 0
let centerVal = 0
let leftVal = 0
// Opcional: deshabilitar LEDs
led.enable(false)
basic.forever(function () {
    // Leer los tres sensores de línea (0 = blanco, 1 = negro - según tu calibración)
    leftVal = mecanumRobotV2.LineTracking(LT.Left)
    centerVal = mecanumRobotV2.LineTracking(LT.Center)
    rightVal = mecanumRobotV2.LineTracking(LT.Right)
    // Lógica de control (ajústala según la respuesta real de tus sensores)
    if (leftVal == 1 && centerVal == 0 && rightVal == 0) {
        // Solo izquierdo detecta línea -> girar izquierda
        car_left()
    } else if (leftVal == 0 && centerVal == 1 && rightVal == 0) {
        // Solo centro detecta línea -> seguir recto
        car_forward()
    } else if (leftVal == 0 && centerVal == 0 && rightVal == 1) {
        // Solo derecho detecta línea -> girar derecha
        car_right()
    } else if (leftVal == 1 && centerVal == 1 && rightVal == 0) {
        // Izquierdo y centro -> corrección suave izquierda
        car_left()
    } else if (leftVal == 0 && centerVal == 1 && rightVal == 1) {
        // Centro y derecho -> corrección suave derecha
        car_right()
    } else if (leftVal == 1 && centerVal == 0 && rightVal == 1) {
        // Solo los extremos (posible fin de línea o error) -> parar o retroceder
        mecanumRobotV2.state()
    } else if (leftVal == 1 && centerVal == 1 && rightVal == 1) {
        // Todos negros (cruce o línea muy ancha) -> seguir recto
        car_forward()
    } else {
        // Ninguno detecta línea (blanco total) -> detenerse o buscar línea
        mecanumRobotV2.state()
    }
})
