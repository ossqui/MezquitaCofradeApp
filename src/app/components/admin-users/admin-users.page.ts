import { ConectService } from './../../services/conect.service';
import { DataService } from './../../services/data.service';
import { AuthService } from './../../services/auth.service';
import { user } from './../../model/user';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.page.html',
  styleUrls: ['./admin-users.page.scss'],
})
export class AdminUsersPage implements OnInit {

  private userList: user[] = [];
  private nameUserActive: string;

  constructor(
    private AuthService: AuthService,
    private DataService: DataService,
    private translate: TranslateService,
    private ConectService: ConectService
  ) {
    this.translate.addLangs(environment.currentLanguages);
    this.translate.use(this.AuthService.getLang());
    this.ConectService.getMessage2().subscribe(() => {
      this.translate.use(this.AuthService.getLang());
    })
  }

  ngOnInit() {
    this.AuthService.returnName().then(name => {
      this.nameUserActive = name;
    });
    this.loadUsers();
  }

  saveUserPermisions(user: user) {

    const userEdit: user = user;

    if (user.isChecked == true) {
      userEdit.permisions = "2";
    } else {
      userEdit.permisions = "1";
    }
    delete userEdit['isChecked'];
    this.DataService.setDataUser(user);
  }

  loadUsers() {
    this.DataService.getUsers().subscribe(listUsers => {
      this.userList = [];
      listUsers.forEach(user => {
        const u: user = user;
        if (user.permisions == "2") {
          u.isChecked = true;
        } else {
          u.isChecked = false;
        }
        if (user.name != this.nameUserActive) this.userList.push(u);
      });
    });
  }
}
