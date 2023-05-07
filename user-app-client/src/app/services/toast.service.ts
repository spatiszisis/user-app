import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
    toasts: any[] = [];

    showSuccess(message: string) {
		this.show(message, { classname: 'bg-success text-light'});
	}

	showDanger(message: string) {
		this.show(message, { classname: 'bg-danger text-light'});
	}

    show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
        this.toasts.push({ textOrTpl, ...options });
    }

    remove(toast) {
        this.toasts = this.toasts.filter((t) => t !== toast);
    }

    clear() {
        this.toasts.splice(0, this.toasts.length);
    }
}