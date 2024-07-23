import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'subscriptions-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscriptions-component.component.html',
  styleUrl: './subscriptions-component.component.css'
})
export class SubscriptionsComponent implements OnInit {
  subscriptions: string[] = [];
  primaryColor: string = '';
  secondaryColor: string = '';
  complementaryColor: string = '';
  buttonColor: string = '';
  textColor: string = '';

  ngOnInit(): void {
    this.loadSubscriptions();
    this.primaryColor = localStorage.getItem('primaryColor') || '#FFFFFF';
    this.secondaryColor = localStorage.getItem('secondaryColor') || '#e5e5e5';
    this.complementaryColor = localStorage.getItem('complementaryColor') || '#4b5563';
    this.buttonColor = localStorage.getItem('buttonColor') || '#9ca3af';
    this.textColor = localStorage.getItem('textColor') || '#000';
  }

  loadSubscriptions(): void {
    const storedSubscriptions = localStorage.getItem('subscriptions');
    this.subscriptions = storedSubscriptions ? JSON.parse(storedSubscriptions) : [];
  }

  unsubscribe(userName: string): void {
    this.subscriptions = this.subscriptions.filter(sub => sub !== userName);
    localStorage.setItem('subscriptions', JSON.stringify(this.subscriptions));
  }
}