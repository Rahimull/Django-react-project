from rest_framework.routers import DefaultRouter
from .views import (
     AuthorViewSet, PublisherViewSet, CategoryViewSet, BookViewSet,
    MemberViewSet, LibrarianViewSet, LoanViewSet, ReservationViewSet,
    ReviewViewSet, EventViewSet
)

router = DefaultRouter()
router.register(r'authors', AuthorViewSet)
router.register(r'publishers', PublisherViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'books', BookViewSet)
router.register(r'members', MemberViewSet)
router.register(r'librarians', LibrarianViewSet)
router.register(r'loans', LoanViewSet)
router.register(r'reservations', ReservationViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'events', EventViewSet)

urlpatterns = router.urls