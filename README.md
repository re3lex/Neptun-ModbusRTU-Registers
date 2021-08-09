# Neptun-ModbusRTU-Registers
Реализация регистров для взаимодействия с модулем системы защиты от протечек Neptun Smart по протоколу ModbusRTU через TCP соединение на JavaScript.

Для запуска тестового скрипта в `index.js` надо создать `.env` файл следующего содержания:
```
NEPTUN_IP=192.168.1.123
NEPTUN_ID=240
```
, где 
- `NEPTUN_IP` IP-адрес модуля Neptun Smart в локальной сети
- `NEPTUN_ID` адрес модуля для обращения по протоколу MODBUS. По-умолчанию адрес **240**


Детально регистры описаны в документе https://www.teploluxe.ru/upload/iblock/f71/f71d774c4bb641cf0e80051c7e3a82ca.pdf
