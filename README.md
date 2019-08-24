# solar-system
中文名:太阳系, 使用nestjs简单实现微服务模式  
```
sun         =>  微服务网管
earth       =>  人员管理  
moon        =>  权限管理
mercury     =>  登录验证,token管理 
planet      =>  通用模块
god         =>  微服务调用封装
```
* sun作为微服务网关不只是代理客户端的数据，微服务之间的调用也通过sun来代理。  
* god封装了微服务之间相互调用的方法，planet中定义了Dto类来描述参数
