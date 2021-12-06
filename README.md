## 介绍
SpiceMapper是一个专门为了生成SPICE语句的JS库。SpiceMapper提供了一个电路的数据结构，并提供了方便的API用来构建电路，和生成SPICE的Netlist语句。

## 使用方法

### 快速开始
使用`npm`来下载spicemapper
```shell
npm install spicemapper
```

之后在你的文件里面引入`spicemapper`，其中`Circuit`是电路类，`Components`包含常用的电路元件，`Types`包含电路元件的类型和单位。
```js
import { Circuit, Resistor, VoltageSource, UnitType } from 'spicemapper';
```
使用`SpiceMapper`的一步要创建一个电路对象：
```js
const cir = new Circuit();
```
再调用相关API创建元件，搭建电路：
```js
cir.add(new Resistor(1, 100, UnitType.K));
cir.add(new VoltageSource(1, 10, UnitType.None));
cir.add(new Resistor(2, 1000, UnitType.None));

cir.connectGround('R1', 0);
cir.connectGround('V1', 1);
cir.connect('R1', 1, 'V1', 0);
cir.connect('R2', 1, 'R1', 1);
cir.connect('R2', 0, 'R1', 0);
```
最后调用电路`generate()`输出SPICE Netlist：
```js
console.log(cir.generate()); 
//output:
// R1 0 1 100K
// V1 1 0 10
// R2 0 1 1000 
```

### `Component`类
通过此类创建一个`Component`
```js
const comp = new ComponentBase(obj);
//obj满足以下形式
obj = {
  type, //ComponentType
  name, //string | number
  value, //number
  unit, //UnitType
  maxDegree, //number
}
```
实际上，这个`obj`是`IComponent`的一个实例。

### `UnitType`和`ComponentType`
`UnitType`和`ComponentType`分别是两个枚举值，其中`UnitType`表示诸如`K,M,P...`的倍率单位，`ComponentType`表示`I`电流源，`R`电阻...之类的元件类型。

### `Circuit`类
`circuit`是一个表示电路的数据结构，他是一个图。通过调用API可以构建起一个电路。首先我们创建电路实例：
```js
const cir = new Circuit();
```
1. 在电路中加入/删除元件
   ```js
    cir.add(component); //传入component实例
    cir.delete(component); //传入component实例或元件全名
   ```
2. 将元件接地
   ```js
   cir.connectGround(component);//传入component实例或元件全名
   ```
3. 将两个元件接通/断开链接
   ```js
    cir.connect(compA,AIndex,compB,BIndex); //分别为component实例和对应元件端口，对于二端元件为0，1
    cir.disconnect(compA,AIndex,compB,BIndex);//分别为component实例和对应元件端口
   ```
1. 输出SPICE Netlist
   ```js
    cir.generate(); //返回SPICE Netlist字符串
   ```
5. 输出节点电压方程
    ```js
      cir.generateFomula(); //返回latex格式的节点电压方程
    ```

## 不足与目标

### 不足
1. 本项目暂不支持多端元件
2. 本项目各方面还未完善
3. 本项目采用的算法并不高效

### 目标
1. 在未来版本中将完善元件，API易用性--已完成 50%
2. 将支持多端元件，支持元件自定义

- 1.1.0新增:
  1. 输出节点电压方程
  2. 增加电容、电感、电流源
  3. 增加交流输出