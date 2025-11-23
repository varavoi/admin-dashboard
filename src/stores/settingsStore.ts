import { makeAutoObservable } from "mobx";

export interface NotificationSettings{
    email:boolean;
    push:boolean;
    sms:boolean;
}
export interface SystemSettings {
    name:string;
    description:string;
}
class SettingsStore{
    notifications:NotificationSettings={
        email:true,
        push:true,
        sms:false,
    }
    system:SystemSettings={
        name:'Панель администрирования',
        description:'Дашборд для аналитики с графиками и управлением пользователями'
    }
    constructor(){
        makeAutoObservable(this)
        this.loadFromLocalStorage()
    }
    // Уведомления
    setEmailNotifications(enabled:boolean){
        this.notifications.email=enabled
        this.saveToLocalStorage()
    }
    setPushNotifications(enabled: boolean) {
        this.notifications.push=enabled
         this.saveToLocalStorage()
    }
    setSmsNotifications(enabled: boolean) {
    this.notifications.sms = enabled;
     this.saveToLocalStorage()
  }
   // Системные настройки
   setSystemName(name:string){
    this.system.name=name
    this.saveToLocalStorage()
   }
   setSystemDescription(description:string){
    this.system.description=description
    this.saveToLocalStorage();
   }

   private saveToLocalStorage(){
    try {
        localStorage.setItem('appSettings',JSON.stringify({
            notifications:this.notifications,
            system:this.system
        }))
    } catch (error) {
        console.error('Failed to save settings to localStorage:', error)
    }
   }
   private loadFromLocalStorage(){
    try {
        const stored =localStorage.getItem('appSettings')
        if(stored){
            const settings = JSON.parse(stored)
            this.notifications ={...this.notifications, ...settings.notifications}
            this.system={...this.system,...settings.system}
        }
    } catch (error) {
        console.error('Failed to load settings from localStorage:', error);
    }
   }
   // Сброс настроек
   resetSettings(){
    this.notifications={
        email:true,
        push:true,
        sms:false
    }
    this.system = {
      name: 'Панель администрирования',
      description: 'Дашборд для аналитики с графиками и управлением пользователями'
    };
    localStorage.removeItem('appSettings');
   }
}
export default new SettingsStore()